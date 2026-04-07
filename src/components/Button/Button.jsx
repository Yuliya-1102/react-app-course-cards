import cls from './Button.module.css';

const isAqua = false;

const Button = ({onClick, children}) => {
  return (
    <button 
        className={`${cls.btn} ${isAqua ? cls.aqua : ''} counter`}
        onClick={onClick}
    >{children}</button>
  )
}

export default Button