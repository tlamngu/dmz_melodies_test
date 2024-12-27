import { useState } from 'react';
import "/src/assets/fonts.css";
import MenuButton from '/src/Components/AdminComponent/Menu/MenuButton/MenuButton';
import MenuBar from '/src/Components/AdminComponent/Menu/MenuBar/MenuBar';
import GridBody from '/src/Components/AdminComponent/Body/gridBody';
import Home from '/src/Components/AdminComponent/Home/Home';
import UserManagement from '/src/Components/AdminComponent/UserManagement/UserManagement';
import ArtistsManagement from '/src/Components/AdminComponent/ArtistsManagement/ArtisitsManagement';
import ContentsManagement from '/src/Components/AdminComponent/ContentsManagement/ContentsManagement';
import ReportManagement from '/src/Components/AdminComponent/ReportsManagement/ReportManagement';

function AdminPage() {
  const [selectedPage, setPage] = useState("Home");

  const renderContent = () => {
    switch (selectedPage) {
      case "Home":
        return <Home />;
      case "UserManagement":
        return <UserManagement />;
      case "ArtistsManagement":
        return <ArtistsManagement />;
      case "ContentsManagement":
        return <ContentsManagement />;
      case "Reports":
        return <ReportManagement />;
      default:
        return <div>No content</div>;
    }
  };

  return (
    <>
      <GridBody
        Menu={
          <MenuBar>
            <MenuButton ButtonText="Home" OnClick={() => setPage("Home")} style={{ backgroundColor: "#202020" }} />
            <MenuButton ButtonText="User management" OnClick={() => setPage("UserManagement")} />
            <MenuButton ButtonText="Artists management" OnClick={() => setPage("ArtistsManagement")} />
            <MenuButton ButtonText="Contents management" OnClick={() => setPage("ContentsManagement")} />
            <MenuButton ButtonText="Reports" OnClick={() => setPage("Reports")} />
            <MenuButton ButtonText="Logout" OnClick={() => setPage("Logout")} style={{ alignSelf: "flex-end" }} />
          </MenuBar>
        }

        Content={renderContent()}
      />
    </>
  );
}

export default AdminPage;
