import React, { Component } from 'react';
import './links.css';
import { Chip, FontIcon, Avatar } from 'material-ui';

class LinksComponent extends Component {

  constructor(props) {
    super(props);

    this.lista = this.props.links;
  }

  navegaLink(link) {
    console.log(link);
  }

  // Renderiza uma lista.
  renderizaLinks() {
    const list = [];

    for(let x = 0; x < this.lista.length; x++) {
      list.push(
        <Chip key={x} onClick={() => {this.navegaLink(this.lista[x])}} id="meuChip">
          <Avatar icon={<FontIcon className="material-icons">folder</FontIcon>} />
          {this.lista[x]}
        </Chip>
      )
    }
    return list;
  }

  render() {
    return(
      <div className="links-compartimento">
        {this.renderizaLinks()}
      </div>
    );
  };
}

export default LinksComponent;