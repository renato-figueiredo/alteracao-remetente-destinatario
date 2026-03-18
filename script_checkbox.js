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

// Função para desativar os toggles de supressão
async function desativarSupressoes() {
  console.log('1️⃣.5 Desativando checkboxes de supressão...');
  
  // Graymail suppression
  const graymailToggle = await aguardarElemento('[data-selenium="graymail-checkbox"]');
  if (graymailToggle) {
    try {
      const graymailInput = graymailToggle.querySelector('input[type="checkbox"]');
      if (graymailInput && graymailInput.checked) {
        graymailToggle.click();
        console.log('✅ Graymail suppression DESLIGADO');
        await sleep(300);
      } else {
        console.log('ℹ️ Graymail já estava desligado');
      }
    } catch (err) {
      console.error('❌ Erro ao desativar graymail:', err);
    }
  }

  // Fatigue suppression
  const fatigueToggle = await aguardarElemento('[data-selenium="fatigue-checkbox"]');
  if (fatigueToggle) {
    try {
      const fatigueInput = fatigueToggle.querySelector('input[type="checkbox"]');
      if (fatigueInput && fatigueInput.checked) {
        fatigueToggle.click();
        console.log('✅ Fatigue suppression DESLIGADO');
        await sleep(300);
      } else {
        console.log('ℹ️ Fatigue já estava desligado');
      }
    } catch (err) {
      console.error('❌ Erro ao desativar fatigue:', err);
    }
  }
}

async function rodarMacro() {
  console.log('🚀 Iniciando macro...');

  // Passo 1 — clica no elemento de envio
  const el1 = await aguardarElementoOu([
    '[data-test-id="send-as-info"]',
    '[data-test-id="send-options-section"]'
  ]);
  if (!el1) return;
  el1.click();
  console.log('1️⃣ Clicou no elemento de envio');
  await sleep(500);

  // Passo 1.5 — DESATIVA os checkboxes de supressão
  await desativarSupressoes();

  console.log('✅ Macro concluída!');
}

rodarMacro();
