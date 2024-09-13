export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>할인 이벤트를 진행합니다~~</h1>
      <div>{children}</div>
    </div>
  );
}

