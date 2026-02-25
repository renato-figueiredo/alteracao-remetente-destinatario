# 🤖 Browser Macro Script

Script JavaScript para automação de ações repetitivas diretamente no console do navegador — sem instalar extensões ou ferramentas externas.

---

## 📋 Pré-requisitos

- Google Chrome ou Edge
- Acesso ao console do DevTools
- O script salvo no seu repositório Git

---

## 🚀 Como usar

### 1. Copie o script do repositório ou copie diretamente

```bash
git clone https://github.com/renato-figueiredo/automacao-hubspot-email.git
```

Abra o arquivo `script.js` e copie todo o conteúdo.

---

### 2. Abra o e-mail que deseja configurar

Acesse a plataforma normalmente pelo navegador e abra o e-mail desejado.

---

### 3. Abra o Console do DevTools

Pressione **F12** (ou `Ctrl + Shift + I`) para abrir o DevTools e clique na aba **Console**.

---

### 4. ⚠️ Libere a permissão para colar scripts

O Chrome bloqueia colagem de código por segurança. Ao abrir o console, você verá o aviso:

```
Warning: Don't paste code into the DevTools Console that you don't trust...
```

Para liberar, **digite exatamente** o texto abaixo no console e pressione **Enter**:

```
allow pasting
```

> Essa etapa só precisa ser feita uma vez por sessão do navegador.

---

### 5. Cole o script e execute

- Pressione **Ctrl + L** para limpar o console
- Cole o script copiado (**Ctrl + V**)
- Pressione **Enter** para executar

Acompanhe o progresso pelos logs no console. Cada passo bem-sucedido exibirá um ✅ e em caso de erro um ❌ com o elemento que falhou.

---

## 🔁 O que o script faz (passo a passo)

| # | Ação | Elemento |
|---|---|---|
| 1 | Clica na div de envio | `data-test-id="send-as-info"` **ou** `data-test-id="send-options-section"` |
| 2 | Clica no botão de método de envio | `data-test-id="sending-methods-select"` |
| 3 | Aguarda dropdown abrir | `data-dropdown-open="true"` |
| 4 | Digita e confirma | `auto` + **Enter** |
| 5 | Clica na seção de conteúdo | `data-test-id="inbox-content-section"` |
| 6 | Marca o checkbox de espaçamento | `data-test-id="preview-text-spacing-cbx"` |
| 7 | Clica no botão de remetente | `data-test-id="fromNames"` |
| 8 | Aguarda dropdown abrir | `data-dropdown-open="true"` |
| 9 | Digita e confirma | `experi` + **Enter** |
| 10 | Clica no botão de reply-to | `data-test-id="replyTos"` |
| 11 | Aguarda dropdown abrir | `data-dropdown-open="true"` |
| 12 | Digita e confirma | `noreply` + **Enter** |
| 13 | Ativa o reply-to customizado | `data-selenium="enable-custom-reply-to"` |
| 14 | Clica no botão de reply-to customizado | `data-test-id="customReplyTos"` |
| 15 | Aguarda dropdown abrir | `data-dropdown-open="true"` |
| 16 | Digita e confirma | `relaciona` + **Enter** |

---

## 🤖 Como gerar um novo script com IA

Você pode pedir para uma IA (como o ChatGPT ou Perplexity) gerar um script semelhante para outros fluxos. Use o prompt base abaixo:

---

### 📌 Prompt base

```
Preciso de um script JavaScript para rodar diretamente no console do Chrome.
Ele deve automatizar cliques, digitação e interações com dropdowns em uma página web.

Use as seguintes funções utilitárias:
- sleep(ms): aguarda X milissegundos
- aguardarElemento(seletor): espera o elemento aparecer no DOM
- aguardarElementoOu(seletores[]): tenta múltiplos seletores, retorna o primeiro encontrado
- clicarEm(seletor): aguarda e clica no elemento
- clicarCheckbox(seletor): clica no input[type=checkbox] interno de uma div wrapper
- aguardarAtributo(seletor, atributo, valor): aguarda um atributo atingir determinado valor
- digitarCaracterePorCaractere(texto): digita caractere por caractere simulando teclado real (compatível com React/Angular)
- pressionarTecla(tecla): simula keydown + keypress + keyup com keyCode
- digitarEConfirmar(seletor, texto): aguarda dropdown abrir, digita e pressiona Enter

Segue o passo a passo que quero automatizar:

[COLE AQUI SEU PASSO A PASSO]
```

---

### 📝 Como montar o passo a passo para a IA

Envie cada ação em uma linha, no formato:

```
Passo 1 - Clicar na div: data-test-id="nome-do-elemento"
Passo 2 - Clicar no button: data-test-id="nome-do-botao"
Passo 3 - Aguardar propriedade: data-dropdown-open="true"
Passo 4 - Escreva: texto que deseja digitar
Passo 5 - Tecle: Enter
Passo 6 - Clicar no checkbox: data-test-id="nome-do-checkbox"
```

> **Dica:** Para pegar o `data-test-id` ou outro atributo de um elemento, clique com o botão direito sobre ele na página → **Inspecionar** → localize a tag HTML destacada e copie o atributo desejado.
