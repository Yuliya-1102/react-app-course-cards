import cls from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cls.footer}>
      React Querstion Cards Application | {currentYear} <br /> by Yiliya
    </footer>
  );
};

export default Footer;
