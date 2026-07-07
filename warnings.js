// Tapgate — warnings.js
// Warning banner system — completely isolated from scanner
// A bug here will never crash the scanner

(function() {

  function showWarning(msg, level, retryFn) {
    try {
      var b = document.getElementById('warning-banner');
      if (!b) return;
      b.className = level || 'amber';
      b.innerHTML = msg + (retryFn ? ' <button class="warn-retry" onclick="' + retryFn + '()">Tap to retry</button>' : '');
      b.style.display = 'block';
    } catch(e) {}
  }

  function clearWarning() {
    try {
      var b = document.getElementById('warning-banner');
      if (b) { b.style.display = 'none'; b.innerHTML = ''; }
    } catch(e) {}
  }

  // Expose globally — if this file fails to load, index.html has safe fallbacks
  window.showWarning  = showWarning;
  window.clearWarning = clearWarning;

})();
