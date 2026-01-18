export const metadata = {
  title: "My Grade",
  description: "Student Grade Dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#c3c3d4" }}>
        {children}
      </body>
    </html>
  );
}
