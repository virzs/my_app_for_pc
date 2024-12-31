import ColorThief from "colorthief";

export const getDominantColor = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // 尝试使用 cors proxy
    const corsProxies = [
      "https://cors-anywhere.herokuapp.com/",
      "https://api.allorigins.win/raw?url=",
    ];

    let proxyIndex = 0;
    const tryLoadImage = () => {
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const colorThief = new ColorThief();
        try {
          const color = colorThief.getColor(img);
          resolve(`rgba(${color[0]},${color[1]},${color[2]},1)`);
        } catch (error) {
          // 如果获取颜色失败，返回默认颜色
          resolve("rgba(128,128,128,1)");
        }
      };

      img.onerror = () => {
        if (proxyIndex < corsProxies.length) {
          // 尝试下一个代理
          img.src = corsProxies[proxyIndex] + encodeURIComponent(imageUrl);
          proxyIndex++;
        } else {
          // 所有代理都失败，返回默认颜色
          resolve("rgba(128,128,128,1)");
        }
      };

      // 首次尝试直接加载
      if (proxyIndex === 0) {
        img.src = imageUrl;
      }
    };

    tryLoadImage();
  });
};
