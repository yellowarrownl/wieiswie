import * as React from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { UserTeamRole } from '@microsoft/teams-js';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

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
    let fullList = this.state.users;
    let cleanList = this.state.users;
    let filterList = this.state.users;
    console.log("filteredlist:", filterList);
    console.log("filter over filter", filterList.filter((user)=> user.displayName == 'Chris Veneboer'))   
   /* this.state.users.filter(function(element, index, array){
      element.displayName = ""
    }) */
    console.log("Dit is een test");

    return (
      <div>

      <SearchBox
        placeholder="Search"
        onEscape={ev => {
          console.log('Custom onEscape Called');
        }}
        onClear={ev => {
          console.log('Custom onClear Called');
        }}
        onChange={function(newValue){ filterList = cleanList.filter((user)=> user.displayName == newValue);}}
        onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
      />

      {filterList.map((user)=>
        <Persona 
          {...user} 
          imageUrl={'/_layouts/15/userphoto.aspx?accountname='+ user.mail +'&size=L'} 
          primaryText={user.displayName}
          secondaryText= {user.mail}  
          />
          )}
      </div>
    );
  }
}

/*
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
            <Persona {...user} />
          {user.displayName}
          <button onClick={(e) => this.klikOpUser(e, user.displayName)}> Verwijder </button>
        </li>
      )}
  </ul>
</div>



*/




