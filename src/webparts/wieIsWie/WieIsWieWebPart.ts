import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WieIsWieWebPartStrings';
import WieIsWie from './components/WieIsWie';
import { IWieIsWieProps } from './components/IWieIsWieProps';
import { IUserProps } from './components/WieIsWie';
import { MSGraphClient } from '@microsoft/sp-http';


export interface IWieIsWieWebPartProps {
  description: string;
}

export default class WieIsWieWebPart extends BaseClientSideWebPart<IWieIsWieWebPartProps> {

  //Start off the site render
  public render(): void {

let element: React.ReactElement<IUserProps>;

    this.context.msGraphClientFactory
      .getClient()
      .then((msgraphclient:MSGraphClient): void =>{
          ReactDom.render(React.createElement(
          WieIsWie,
          {
          graphClient: msgraphclient
         }
        ), this.domElement);
        
      })

  //Rending public site
    ReactDom.render(element, this.domElement);
  } 

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  //Stop of the site render

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
