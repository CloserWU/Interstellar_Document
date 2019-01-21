import React from 'react';
import classNames from 'classnames';
import { Card } from 'antd';
import styles from './index.less';

const GlobalFooter = ({ className, links, links1, copyright }) => {
  // const visiable = ((links1 === null) ? true : false) ;
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {links1 && (
        <Card className={styles.Card}>
          {links1 && (
            <div className={styles.links1}>
              {links1.map(link => (
                <a
                  key={link.key}
                  title={link.key}
                  target={link.blankTarget ? '_blank' : '_self'}
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </div>
          )}
          {links1 && (
            <div className={styles.links1}>
              {links1.map(link => (
                <a
                  key={link.key}
                  title={link.key}
                  target={link.blankTarget ? '_blank' : '_self'}
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </div>
          )}
        </Card>
      )}

      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
};

export default GlobalFooter;
