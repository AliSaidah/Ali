import { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/motion';

// Fundo em WebGL: luz quente passeando sobre uma parede de cimento queimado,
// como a recepção da clínica. Dois tons: claro (linho) e escuro (café).
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uDark;

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
  float t = uTime * 0.03;

  // Textura de reboco: manchas largas e suaves.
  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 + vec2(4.1, 2.7) - t));
  float wall = fbm(p * 2.2 + 1.8 * q);

  // Luz: um foco quente que segue o mouse devagar + feixe diagonal respirando.
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float spot = exp(-2.2 * length(p - m * 0.6 - vec2(0.15, 0.2)));
  float beam = smoothstep(0.55, 0.0, abs(p.x * 0.8 + p.y - 0.25 + sin(t * 3.0) * 0.12)) * (0.6 + 0.4 * sin(t * 2.0 + p.y * 2.0));

  vec3 linen = vec3(0.945, 0.925, 0.898);
  vec3 clay = vec3(0.85, 0.80, 0.75);
  vec3 copper = vec3(0.86, 0.60, 0.40);
  vec3 cafe = vec3(0.13, 0.10, 0.085);
  vec3 cafe2 = vec3(0.24, 0.18, 0.14);

  vec3 light = mix(clay, linen, smoothstep(-0.5, 0.45, wall + q.x * 0.3));
  light += copper * 0.10 * spot + vec3(1.0, 0.95, 0.88) * 0.06 * beam;

  vec3 dark = mix(cafe, cafe2, smoothstep(-0.4, 0.5, wall + q.y * 0.4));
  dark += copper * 0.22 * spot * smoothstep(-0.3, 0.6, wall) + copper * 0.05 * beam;

  vec3 col = mix(light, dark, uDark);
  float vig = smoothstep(1.3, 0.3, length((uv - 0.5) * vec2(1.0, 1.3)));
  col *= mix(0.94, 1.0, vig);
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}`;

export default function LightCanvas({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) { canvas.classList.add('light--fallback'); return; }

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.classList.add('light--fallback'); return; }
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
    gl.uniform1f(gl.getUniformLocation(prog, 'uDark'), dark ? 1 : 0);

    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.5;
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
    const start = performance.now() - 15000;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (reducedMotion) { gl.uniform1f(uTime, 30); gl.uniform2f(uMouse, 0.5, 0.5); gl.drawArrays(gl.TRIANGLES, 0, 3); }
    else raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, [dark]);

  return <canvas ref={ref} className={`light ${className}`} aria-hidden="true" />;
}
