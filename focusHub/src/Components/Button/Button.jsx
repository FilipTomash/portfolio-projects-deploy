const Button = (props) => {
  return (
    <button
      className={props.className} // will change later
      style={props.btnStyle}
      onClick={props.onBtnClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.btnText}
    </button>
  );
};

export default Button;
