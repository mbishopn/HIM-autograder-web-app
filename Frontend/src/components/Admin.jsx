import LoggedBar from "./loggedBar"
import UpdatePassword from "./UpdatePassword";

export default function Admin() {

  return (
    <>
      <div><LoggedBar /></div>
      <h2>HIM Autograder</h2>
      <div className="mainContainer">
      <div ><span>Setting passwords for current users</span></div>
      <div className="infoArea"><UpdatePassword /></div>
      </div>
    </>
  );
}
