import { toast } from 'react-toastify';
import { css } from 'glamor';

export default {
  success(msg, options = {}){
    return toast.success(`🎉 ${msg}`, {
      ...options,
      position: toast.POSITION.BOTTOM_RIGHT,
      className: css({
        backgroundColor: '#29bd9e',
        fontFamily: 'Open Sans, Helvetica, Arial, sans-serif'
      })
    });
  },
  error(msg, options = {}){
    return toast.error(`❌ ${msg}`, {
      ...options,
      position: toast.POSITION.BOTTOM_RIGHT,
      className: css({
        backgroundColor: '#ffffff',
        color: '#000000',
        fontFamily: 'Open Sans, Helvetica, Arial, sans-serif'
      })
    });
  }
}
