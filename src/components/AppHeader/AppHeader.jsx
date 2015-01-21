var React = require('react')

require('components/AppHeader/AppHeader.scss')

var ViewActions = require('actions/ViewActions')
,   Legend = require('components/AppHeader/Legend')
,   GenreHeader = require('components/AppHeader/GenreHeader')

var AppHeader = React.createClass({

  navigateBack() {
    ViewActions.navToGalaxy()
  },

  toggleLegend() {
    if (this.props.dynamicState.get('legendOpen')) {
      ViewActions.hideLegend()
    } else {
      ViewActions.showLegend()
    }
  },

  toggleAbout() {
    if (this.props.dynamicState.get('aboutOpen')) {
      ViewActions.hideAbout()
    } else {
      ViewActions.showAbout()
    }
  },

  openShare() {
    ViewActions.openShare()
  },

  closeShare() {
    ViewActions.closeShare()
  },

  attributeLegendClick(attributeName) {
    ViewActions.highlightAttribute(attributeName)
  },

  render() {
    var dynamicState = this.props.dynamicState
    ,   inDetail = dynamicState.get('inDetail')
    ,   legendOpen = dynamicState.get('legendOpen')
    ,   aboutOpen = dynamicState.get('aboutOpen')
    ,   shareOpen = dynamicState.get('shareOpen')
    ,   highlightedAttribute = dynamicState.get('highlightedAttribute')

    return (
      <div className="AppHeader" >
        <div className="AppHeader--navigation">
          <div className="AppHeader--back" onClick={this.navigateBack} >
            {inDetail ? (
              <div className="AppHeader--backarrow icon-arrow-back" />
            ) : ('')}
            <h1 className="AppHeader--title" >A Galaxy of Covers</h1>
          </div>
          {!shareOpen ? (
            <div className="AppHeader--menu" >
              <div className={"AppHeader--menuoption " + (legendOpen ? 'AppHeader--menuoption__active' : '')} onClick={this.toggleLegend} >
                <h2 className="AppHeader--navlabel">Legend</h2>
                <span className={"AppHeader-icon " + (legendOpen ? "icon-keyboard-arrow-up" : "icon-keyboard-arrow-down")} />
              </div>
              <div className={"AppHeader--menuoption " + (aboutOpen ? 'AppHeader--menuoption__active' : '')} onClick={this.toggleAbout} >
                <h2 className="AppHeader--navlabel">About</h2>
                <span className={"AppHeader-icon " + (aboutOpen ? "icon-keyboard-arrow-up" : "icon-keyboard-arrow-down")} />
              </div>
              <div className="AppHeader--menuoption" onClick={this.openShare} >
                <h2 className="AppHeader--navlabel">Share</h2>
                <span className="AppHeader-icon icon-add" />
              </div>
            </div>
          ) : (
            <div className="AppHeader--menu" >
              <div className="AppHeader--menuoption AppHeader--menuoption__active" >
                <h2 className="AppHeader--navlabel" onClick={this.closeShare} >Share</h2>
                <span className="AppHeader-icon icon-close" onClick={this.closeShare} />
                <div className="AppHeader-icon AppHeader-shareicon icon-twitter" />
                <div className="AppHeader-icon AppHeader-shareicon icon-facebook" />
                <div className="AppHeader-icon AppHeader-shareicon icon-pinterest" />
              </div>
            </div>
          )}
        </div>
        <Legend isOpen={legendOpen} inDetail={inDetail} highlighted={highlightedAttribute} onClick={this.attributeLegendClick} />
        <GenreHeader
          genreCount={this.props.genreCount}
          headerWidth={this.props.layout.headerWidth}
          dynamicState={this.props.dynamicState}
          scales={this.props.scales}
        />
      </div>
    )
  }

})

module.exports = AppHeader
