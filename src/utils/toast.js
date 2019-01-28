import { toast } from 'react-toastify';

if (!Array.prototype.random) {
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
}

function randomSuccessEmoji() {
  return ['🌟', '🍩', '🎯', '🎉', '🎊', '🚀'].random()
}

function randomErrorEmoji() {
  return ['🔔', '😢', '👀'].random()
}

export default {
  success(msg, options = {}) {
    return toast(`${randomSuccessEmoji()} ${msg}`, {
      ...options,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  },
  error(msg, options = {}) {
    return toast(`${randomErrorEmoji()} ${msg}`, {
      ...options,
      position: toast.POSITION.BOTTOM_RIGHT,
      progressClassName: 'toast-progress toast-progress-error'
    });
  }
}
