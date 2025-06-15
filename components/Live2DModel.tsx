// import { useRef, useEffect } from "react";
// import * as PIXI from "pixi.js";
// import { Live2DModel } from "pixi-live2d-display";

// const Live2DComponent = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // クライアントサイドでのみPixiJSを初期化
//     if (typeof window !== "undefined") {
//       console.log("window");
//       console.log(window);
//       const app = new PIXI.Application({
//         width: window.innerWidth,
//         height: window.innerHeight,
//         transparent: true,
//       });

//       // 自動生成されたキャンバスをHTMLDivElementに追加
//       if (containerRef.current) {
//         containerRef.current.appendChild(app.view);
//         console.log("app.view");
//         console.log(app.view);
//       }

//       // Live2Dモデルの読み込み
//       Live2DModel.from("/Resources/aoi/aoi.model3.json").then((model) => {
//         // screenがnullでないか確認
//         if (containerRef.current) {
//           model.scale.set(0.05); // モデルのスケールを設定
//           // model.position.set(app?.view.width / 2, app?.view.height / 2); // 中央に配置
//           model.position.set(500, 500); // 中央に配置(app.viewエラーが起きるので一旦固定値)
//           model.anchor.set(0.5, 0.5); // モデルのアンカーを中央に

//           // 型キャストでモデルをPIXI.Containerとして扱う
//           app.stage?.addChild(model as PIXI.Container);
//         }
//       });

//       // ウィンドウのリサイズに対応
//       const resizeApp = () => {
//         app.renderer.resize(window.innerWidth, window.innerHeight);
//       };
//       window.addEventListener("resize", resizeApp);

//       // クリーンアップ処理
//       return () => {
//         app.destroy(true, true); // Pixiアプリケーションの破棄
//         window.removeEventListener("resize", resizeApp);
//       };
//     }
//   }, []);

//   return <div ref={containerRef}></div>; // キャンバスを埋め込むコンテナ
// };

// export default Live2DComponent;
