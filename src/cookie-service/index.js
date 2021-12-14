export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  return (parts.length === 2) ? parts.pop().split(';').shift() : '';
};

export const setCookie = (name, valueArg, optionsArg) => {
  let options = optionsArg || {};

  let { expires } = options;

  if (expires) {
    if (typeof expires === 'number') {
      const d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires || d;
    }
    if (expires instanceof Date) {
      options = { ...options, expires: expires.toUTCString() };
    }
  }

  const value = encodeURIComponent(valueArg);
  let updatedCookie = `${name}=${value}`;

  Object.keys(options).forEach((propName) => {
    if (Object.prototype.hasOwnProperty.call(options, propName)) {
      updatedCookie += `; ${propName}`;
     const propValue = options[propName];

      if (propValue) {
        updatedCookie += `=${propValue}`;
      }
    }
  });

  document.cookie = updatedCookie;
};

export const deleteCookie = (name, path) => {
  setCookie(name, '', {
    expires: -1,
    path,
  });
};

export const clearCookies = () => {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
};
