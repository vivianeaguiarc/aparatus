export const PageConatiner = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6 p-5">{children}</div>;
};
export const PageSectiionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h3 className="text-xs font-bold uppercase">{children}</h3>;
};
export const PageSectionContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="space-y-3">{children}</div>;
};

export const PageSectionScroller = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-4 flex gap-4 space-y-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
};
