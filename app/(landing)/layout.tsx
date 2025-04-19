const LandingPage = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
export default LandingPage;
