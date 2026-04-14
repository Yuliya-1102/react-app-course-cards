import cls from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={cls.backdrop}>
      <span className={cls.loader}></span>
    </div>
  );
};

export default Loader;
