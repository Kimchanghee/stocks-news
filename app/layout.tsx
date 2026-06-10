import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M0JVEG23XY" />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-M0JVEG23XY',{page_path:window.location.pathname});",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
