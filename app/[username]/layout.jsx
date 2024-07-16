import UserPageProvider from "./Provider";
import Footer from "./_components/footer";

const layout = ({ children }) => {
  return (
    <UserPageProvider>
      {children}
      <Footer />
    </UserPageProvider>
  );
};

export default layout;
