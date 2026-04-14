import cls from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={cls.backdrop}>
      <span class={cls.loader}></span>;
    </div>
  );
};

export default Loader;
