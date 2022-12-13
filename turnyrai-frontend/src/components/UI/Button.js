import './Button.module.css';

const Button = (props) => {
    return (
        <button className={props.classes} onClick={props.onClick}>{props.children}</button>
    );
};

export default Button;