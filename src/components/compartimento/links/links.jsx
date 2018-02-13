import React, { Component } from 'react';
import './links.css';
import { Chip, FontIcon, Avatar } from 'material-ui';

class LinksComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {lista: []};
  }

  componentDidMount() {
    let obs = {
      next: (data) => {
        if(data !== false)
          this.setState({lista: [...data]});
        else
          console.log('Sem links');
      },
      error: (err) => {
        console.log(err);
      }
    }
    this.props.apiService.getSubFolders().subscribe(obs);
  }

  navegaLink(link) {
    this.props.navigate.replace('/' + link);
    this.props.navigate.go('/' + link);
  }

  // Renderiza uma lista.
  renderizaLinks() {
    const list = [];

    for(let x = 0; x < this.state.lista.length; x++) {
      const links = this.state.lista[x].split('/');
      const link = links[links.length -1];
      list.push(
        <Chip key={x} onClick={() => {this.navegaLink(this.state.lista[x])}} id="meuChip">
          <Avatar icon={<FontIcon className="material-icons">folder</FontIcon>} />
          {
            link
          }
        </Chip>
      )
    }
    return list;
  }

  render() {
    console.log('**** Render links.jsx ****');
    return(
      <div className="links-compartimento">
        {this.renderizaLinks()}
      </div>
    );
  };
}

export default LinksComponent;