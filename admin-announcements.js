// Create floating unicorn particles
function createParticles() {
  const bg = document.getElementById('magic-bg');
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'unicorn-particle';
    particle.style.width = `${Math.random() * 20 + 10}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    bg.appendChild(particle);
  }
}
createParticles();

// Auto-update timestamp
function updateTime() {
  const now = new Date();
  const options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  };
  document.getElementById('current-time').textContent = now.toLocaleDateString('en-US', options);
}
updateTime();
setInterval(updateTime, 60000);

// Advanced Text Formatting
function formatText(style) {
  const textarea = document.querySelector('.announcement-text');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  let newText = '';

  switch(style) {
    case 'bold':
      newText = `**${selectedText}**`;
      break;
    case 'italic':
      newText = `_${selectedText}_`;
      break;
    case 'magic-text':
      newText = `[magic-text]${selectedText}[/magic-text]`;
      break;
    case 'sparkle-box':
      newText = `[sparkle-box]${selectedText}[/sparkle-box]`;
      break;
    case 'urgent-pulse':
      newText = `[urgent-pulse]${selectedText}[/urgent-pulse]`;
      break;
    case 'star-list':
      newText = selectedText.split('\n').map(line => `✧ ${line}`).join('\n');
      break;
    default:
      newText = selectedText;
  }

  textarea.value = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
  textarea.focus();
  textarea.setSelectionRange(start, start + newText.length);
}