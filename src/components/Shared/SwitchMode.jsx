import { Dropdown } from "flowbite-react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { switchUserMode } from "../../features/auth/authSlice";

export default function SwitchMode({ mode }) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  function changeUserRole(value) {
    dispatch(switchUserMode(value));
  }
  return (
    <Dropdown.Item
      className="border-2"
      onClick={() => changeUserRole(role === "buyer" ? "seller" : "buyer")}
    >
      Switch to {role === "buyer" ? "Selling" : "Buying"}
    </Dropdown.Item>
  );
}

SwitchMode.propTypes = {
  mode: PropTypes.string.isRequired,
};
