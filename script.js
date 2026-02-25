
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function aguardarElemento(seletor, tentativas = 20) {
  for (let i = 0; i < tentativas; i++) {
    const el = document.querySelector(seletor);
    if (el) return el;
    await sleep(300);
  }
  console.error(`❌ Elemento não encontrado: ${seletor}`);
  return null;
}

// Tenta múltiplos seletores, retorna o primeiro que encontrar
async function aguardarElementoOu(seletores, tentativas = 20) {
  for (let i = 0; i < tentativas; i++) {
    for (const seletor of seletores) {
      const el = document.querySelector(seletor);
      if (el) {
        console.log(`✅ Encontrado: ${seletor}`);
        return el;
      }
    }
    await sleep(300);
  }
  console.error(`❌ Nenhum encontrado: ${seletores.join(' | ')}`);
  return null;
}

async function clicarEm(seletor) {
  const el = await aguardarElemento(seletor);
  if (!el) return false;
  el.click();
  console.log(`🖱️ Clicou em: ${seletor}`);
  await sleep(500);
  return true;
}

async function aguardarAtributo(seletor, atributo, valor, tentativas = 20) {
  for (let i = 0; i < tentativas; i++) {
    const el = document.querySelector(seletor);
    if (el && el.getAttribute(atributo) === valor) {
      console.log(`✅ "${atributo}=${valor}" detectado!`);
      return true;
    }
    await sleep(300);
  }
  console.error(`❌ Timeout: "${atributo}=${valor}" não apareceu`);
  return false;
}

async function digitarCaracterePorCaractere(texto) {
  const el = document.activeElement;
  if (!el) { console.error('Nenhum elemento com foco'); return; }

  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype, 'value'
  )?.set;

  for (const char of texto) {
    el.dispatchEvent(new KeyboardEvent('keydown',  { key: char, bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keypress', { key: char, bubbles: true }));

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(el, el.value + char);
    } else {
      el.value += char;
    }

    el.dispatchEvent(new InputEvent('input', {
      data: char,
      bubbles: true,
      inputType: 'insertText'
    }));
    el.dispatchEvent(new KeyboardEvent('keyup', { key: char, bubbles: true }));

    await sleep(80);
  }
  console.log(`⌨️ Digitado: "${texto}"`);
}

async function pressionarTecla(tecla) {
  const el = document.activeElement;
  const opcoes = {
    key: tecla,
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  };
  el.dispatchEvent(new KeyboardEvent('keydown',  opcoes));
  el.dispatchEvent(new KeyboardEvent('keypress', opcoes));
  el.dispatchEvent(new KeyboardEvent('keyup',    opcoes));
  await sleep(300);
  console.log(`↩️ Pressionou: ${tecla}`);
}

// -----------------------------------------------
async function rodarMacro() {
  console.log('🚀 Iniciando macro...');

  // Passo 1 — tenta os dois seletores possíveis
  const el1 = await aguardarElementoOu([
    '[data-test-id="send-as-info"]',
    '[data-test-id="send-options-section"]'
  ]);
  if (!el1) return;
  el1.click();
  console.log('1️⃣ Clicou no elemento de envio');
  await sleep(500);

  // Passo 2 — clica no botão do dropdown
  const ok2 = await clicarEm('[data-test-id="sending-methods-select"]');
  if (!ok2) return; 

  // Passo 3 — aguarda o dropdown abrir
  const abriu = await aguardarAtributo(
    '[data-test-id="sending-methods-select"]',
    'data-dropdown-open',
    'true'
  );
  if (!abriu) return;

  // Passo 4 — digita "auto" caractere por caractere
  await digitarCaracterePorCaractere('auto');

  // Passo 5 — pressiona Enter
  await pressionarTecla('Enter');

  console.log('✅ Macro concluída!');
}

rodarMacro();
