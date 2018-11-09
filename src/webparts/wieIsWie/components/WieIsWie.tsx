import * as React from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { UserTeamRole } from '@microsoft/teams-js';
//import { IPersonaProps, IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

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

  /* public componentDidMount(): void {
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
  } */
    
  public componentDidMount(): void { 
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
   /* this.state.users.filter(function(element, index, array){
      element.displayName = ""
    }) */
    console.log("Dit is een test");
    return (
      <div>
        <div>
          <form action="">
            Filter: <input type="text"/>
            <button  type="button"  onClick={(e) => this.klikOpFilter(e)}>Filter lijst</button>
          </form>
        </div>
        <ul> 
          {this.state.users.map((user) =>
              <li>
                {user.displayName}
                <button onClick={(e) => this.klikOpUser(e, user.displayName)}> Verwijder </button>
              </li> 
            )}
        </ul>

      </div>
    );
  }

  klikOpUser(event:any, naam:string): void{
    console.log("Klik op " + naam );
    var index = this.state.users.map(function(x) {return x.displayName; }).indexOf(naam);
    this.state.users.splice(index,1);
    console.log(index);
    console.log(this.state.users);
  }

  klikOpFilter(event:any){
    this.state.users.filter(function(user){
      user.displayName == 'Chris Veneboer';
    } )
    console.log(this.state.users);
  }

}

