const CoverBoard = ({
  showAlert,
  children,
}: {
  showAlert: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      {showAlert && (
        <section className="absolute z-50 w-full h-full bg-black/40  rounded-md shadow-2xl ">
          {children}
        </section>
      )}
    </>
  );
};

export default CoverBoard;