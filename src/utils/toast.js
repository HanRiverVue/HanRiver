import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const defaultToast = (text, options = {}) => {
  toast(text, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    ...options,
  });
};

export const successToast = (text, options = {}) => {
  toast.success(text, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    ...options,
  });
};

export const errorToast = (text, options = {}) => {
  toast.error(text, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    ...options,
  });
};

export const infoToast = (text, options = {}) => {
  toast.info(text, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    ...options,
  });
};

export const warningToast = (text, options = {}) => {
  toast.info(text, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    ...options,
  });
};
