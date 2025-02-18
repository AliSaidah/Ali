import collections

def quiz():
    perguntas = [
        ("O que mais te motiva no ambiente de trabalho?", [
            ("Gerenciar equipes e otimizar processos.", "Gestão", "Logística"),
            ("Aprender novas habilidades para crescer na carreira.", "Desenvolvimento Pessoal", "Saúde"),
            ("Garantir a segurança e o cumprimento de normas.", "Segurança", "Legislação"),
            ("Criar soluções para reduzir impactos ambientais.", "Ambiental", "Tecnologia"),
            ("Manter máquinas e estruturas funcionando corretamente.", "Manutenção", "Aéreo")
        ]),
        ("O que mais te fascina em aeroportos?", [
            ("A movimentação eficiente de cargas e passageiros.", "Aéreo", "Logística"),
            ("O uso de tecnologia para otimizar operações.", "Aéreo", "Tecnologia"),
            ("Os protocolos de segurança para evitar riscos.", "Aéreo", "Segurança"),
            ("O impacto ambiental das operações aéreas.", "Aéreo", "Ambiental"),
            ("A manutenção de aeronaves e infraestrutura.", "Aéreo", "Manutenção")
        ]),
        ("Como você prefere resolver problemas?", [
            ("Criando estratégias e processos organizacionais.", "Gestão", "Tecnologia"),
            ("Garantindo que equipamentos funcionem bem.", "Manutenção", "Saúde"),
            ("Implementando medidas de segurança eficazes.", "Segurança", "Logística"),
            ("Desenvolvendo novas habilidades para se adaptar.", "Desenvolvimento Pessoal", "Ambiental"),
            ("Aplicando normas para garantir conformidade.", "Legislação", "Aéreo")
        ]),
        ("Qual dessas situações você considera mais desafiadora?", [
            ("Planejar a logística para garantir entregas rápidas.", "Logística", "Gestão"),
            ("Manter máquinas e sistemas funcionando bem.", "Manutenção", "Tecnologia"),
            ("Garantir que regras e normas sejam seguidas.", "Segurança", "Legislação"),
            ("Reduzir os impactos ambientais no transporte.", "Ambiental", "Saúde"),
            ("Assegurar que viagens aéreas sejam seguras.", "Aéreo", "Segurança")
        ]),
        ("O que mais te preocupa em relação ao meio ambiente?", [
            ("O impacto das indústrias e como torná-las mais sustentáveis.", "Ambiental", "Gestão"),
            ("A necessidade de mais regulamentações ambientais.", "Legislação", "Ambiental"),
            ("O uso de tecnologia para reduzir poluição.", "Tecnologia", "Ambiental"),
            ("A logística inadequada que gera desperdício.", "Logística", "Ambiental"),
            ("Os riscos ambientais que afetam a saúde pública.", "Saúde", "Segurança")
        ]),
            ("Quais são os principais desafios para tornar o transporte mais eficiente?", [
        ("A falta de infraestrutura para transporte público de qualidade.", "Logística", "Gestão"),
        ("A necessidade de reduzir as emissões de veículos a combustão.", "Ambiental", "Tecnologia"),
        ("O alto custo da eletrificação de frotas e transporte coletivo.", "Economia", "Gestão"),
        ("A falta de incentivos para o uso de meios de transporte sustentáveis.", "Legislação", "Gestão"),
        ("O impacto do tráfego e da poluição na saúde da população.", "Saúde", "Ambiental")
    ]),
    ("O que pode impulsionar a mobilidade sustentável nas cidades?", [
        ("A criação de ciclovias e infraestrutura para meios de transporte alternativos.", "Logística", "Ambiental"),
        ("Adoção de tecnologias como veículos elétricos e hidrogênio.", "Tecnologia", "Gestão"),
        ("Políticas públicas para restringir o uso de veículos poluentes.", "Legislação", "Ambiental"),
        ("Investimentos em transporte público eficiente e acessível.", "Gestão", "Economia"),
        ("Uso de inteligência artificial para otimizar trânsito e reduzir congestionamentos.", "Tecnologia", "Logística")
    ])


    ]
    
    temas = collections.defaultdict(int)
    
    for pergunta, opcoes in perguntas:
        print(f"\n{pergunta}")
        for i, (opcao, _, _) in enumerate(opcoes, start=1):
            print(f"{chr(64+i)}) {opcao}")
        
        escolha = input("Escolha uma opção (A-E): ").strip().upper()
        while escolha not in "ABCDE":
            escolha = input("Opção inválida. Escolha A, B, C, D ou E: ").strip().upper()
        
        tema1, tema2 = opcoes[ord(escolha) - ord('A')][1:]
        temas[tema1] += 1
        temas[tema2] += 1
    
    tema_preferido = max(temas, key=temas.get)
    print(f"\nSeu tema de maior interesse é: {tema_preferido}!")

if __name__ == "__main__":
    quiz()
