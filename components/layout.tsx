import styles from '../styles/layout.module.scss';
import Menu from './menu';

export interface LayoutProps {
  heading: string;
  children?: JSX.Element | JSX.Element[];
}

export default function Layout(props: LayoutProps) {
  return (
    <div className={styles.flexContainer} >
      <div className={styles.header} >
        <h1 className={styles.heading}>
          {props.heading}
        </h1>
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
      <Menu />
    </div>
  );
}