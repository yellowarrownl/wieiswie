import * as React from 'react';
import styles from './WieIsWie.module.scss';
import { IWieIsWieProps } from './IWieIsWieProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IUserProps {
  graphClient: MSGraphClient;
}

export interface IUsersState {
  users: any[];
}

export default class WieIsWie extends React.Component<IUserProps, {}> {
  
  constructor(props: IUserProps) {
    super(props);

    this.state = {
      users: []
    };
  }

  public listData(): void {
  this.context.msGraphClientFactory
  .getClient()
  .then((client: MSGraphClient): void => {
    // get information about the current user from the Microsoft Graph
    client
      .api('/users')
      .get((error, res: any, rawResponse?: any) => {
        console.log(res);
        // Passes the information to a constructor to set the state
        const userList:any[] = res.value;
        this.setState({users: userList});
        });
     });
    }     
  
  public render(): React.ReactElement<IWieIsWieProps> {   

    return (
      <div className={ styles.wieIsWie }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }></span>
              <p className={ styles.subTitle }></p>
              <p className={ styles.description }></p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

