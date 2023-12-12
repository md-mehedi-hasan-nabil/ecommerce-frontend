import PropTypes from "prop-types";

export default function Error({ message }) {
  return (
    <h2 className="text-center text-xl text-red-600 font-semibold">
      {message}
    </h2>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
