import UserPageProvider from "./Provider";

const layout = ({ children }) => {
  return (
    <UserPageProvider>
      {children}
    </UserPageProvider>
  );
};

export default layout;
