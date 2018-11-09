import * as React from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { UserTeamRole } from '@microsoft/teams-js';

export interface IUserProps {
  graphClient: MSGraphClient;
}

export interface IUsersState {
  users: MicrosoftGraph.User[];
}

export default class WieIsWie extends React.Component<IUserProps, IUsersState> {
  
  constructor(props: IUserProps) {
    super(props);

    this.state = {
      users: []
    };
  }

  public componentDidMount(): void {
    console.log("Hier roepen wij de functie Graph aan");
    this.props.graphClient
    .api('/users')
    .get((error:any, res: any, rawResponse?: any) => {
      console.log(res);
      console.log(error);
      // Passes the information to a constructor to set the state
      const userList:MicrosoftGraph.User[] = res.value;
      this.setState({users: userList});
      console.log(this.state);
    });
  }
    
  public render(): React.ReactElement<IUserProps> {
    console.log("Dit is een test");
    return (
      <div><p>{this.state.users}</p></div>
    );
  }
}

