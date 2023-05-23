import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useLogout } from "../hooks/useLogout";
import { BsFillGearFill } from "react-icons/bs";
import { useState } from "react";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { HiBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { user } = useUserContext();
  const { logout } = useLogout();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { deleteUser } = useDeleteUser();

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    setShowSettingsMenu(false);
  };

  const deleteAccount = async () => {
    logout();
    await deleteUser();
    setShowMenu(false);
    setShowSettingsMenu(false);
  };

  return (
    <>
      <nav className="desktop">
        <div className="logo">
          <Link to="/">
            <h2>LOGO.</h2>
          </Link>
        </div>
        {user ? (
          <div className="nav-items">
            <button>
              <Link to="/create">Create Blog</Link>
            </button>

            <Link to={`user/${user.username}`}>
              <h3>{user.username}</h3>
            </Link>

            <BsFillGearFill
              className="settings-icon"
              onClick={() => setShowSettingsMenu((prev) => !prev)}
            />
            {showSettingsMenu && (
              <div className="settings-menu">
                <h3>Hello, {user.username}😊</h3>
                <button className="delete" onClick={deleteAccount}>
                  Delete Me
                </button>
              </div>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="nav-items">
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </div>
        )}
      </nav>
      <nav className="mobile">
        <div className="logo">
          <Link to="/" onClick={() => setShowMenu(false)}>
            <h2>LOGO.</h2>
          </Link>
        </div>
        {user && (
          <div className="mobile-user">
            <button onClick={() => setShowMenu(false)}>
              <Link to="/create">Create Blog</Link>
            </button>
            {showMenu ? (
              <IoMdClose onClick={() => setShowMenu(false)} />
            ) : (
              <HiBars3 onClick={() => setShowMenu(true)} />
            )}
          </div>
        )}

        {showMenu && user && (
          <div className="nav-items">
            <h3>Hello, {user.username}😊</h3>
            <button>
              <Link
                to={`/user/${user.username}`}
                onClick={() => setShowMenu(false)}
              >
                My Profile
              </Link>
            </button>
            <button className="delete" onClick={deleteAccount}>
              Delete Me
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!user && (
          <div className="nav-items-actions">
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
