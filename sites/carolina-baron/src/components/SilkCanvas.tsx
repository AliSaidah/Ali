import { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/motion';

// Fundo em WebGL: seda líquida em tons de noir, cacau, nude e champagne.
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

vec2 hash(vec2 p){ p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return -1.0 + 2.0 * fract(sin(p) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0; float a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6); for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.045;
  vec2 m = (uMouse - 0.5) * 0.35;

  vec2 q = vec2(fbm(p * 1.1 + t), fbm(p * 1.1 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.4 + 2.2 * q + vec2(1.7, 9.2) + t * 1.4 + m), fbm(p * 1.4 + 2.2 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 0.9 + 2.0 * r);

  vec3 noir = vec3(0.051, 0.043, 0.039);
  vec3 cocoa = vec3(0.20, 0.13, 0.10);
  vec3 nude = vec3(0.60, 0.43, 0.36);
  vec3 champagne = vec3(0.93, 0.82, 0.66);

  vec3 col = mix(noir, cocoa, smoothstep(-0.45, 0.35, f));
  col = mix(col, nude, smoothstep(0.1, 0.75, length(q)) * 0.7);
  float folds = 0.5 + 0.5 * sin(f * 7.0 + r.x * 5.0 + t * 2.0);
  col += champagne * pow(folds, 7.0) * 0.55 * smoothstep(-0.2, 0.5, f);
  col += champagne * 0.06 * smoothstep(0.3, 0.9, r.y);
  col *= uIntensity;

  float vig = smoothstep(1.15, 0.25, length((uv - vec2(0.5, 0.42)) * vec2(1.0, 1.25)));
  col = mix(noir, col, vig);
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.025;
  gl_FragColor = vec4(col, 1.0);
}`;

export default function SilkCanvas({ intensity = 1, className = '' }: { intensity?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) { canvas.classList.add('silk--fallback'); return; }

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.classList.add('silk--fallback'); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uInt = gl.getUniformLocation(prog, 'uIntensity');
    gl.uniform1f(uInt, intensity);

    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.6;
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
      gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX / window.innerWidth; mouse.ty = 1 - e.clientY / window.innerHeight; };
    window.addEventListener('pointermove', onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    let raf = 0;
    const start = performance.now() - 20000;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (reducedMotion) { gl.uniform1f(uTime, 40); gl.uniform2f(uMouse, 0.5, 0.5); gl.drawArrays(gl.TRIANGLES, 0, 3); }
    else raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, [intensity]);

  return <canvas ref={ref} className={`silk ${className}`} aria-hidden="true" />;
}
