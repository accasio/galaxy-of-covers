var React = require('react')

var SvgUtil = require('util/svgutil')
,   SongSystem = require('components/SongSystem/SongSystem')
,   TimelineGenreHeader = require('components/TimelineGenreHeader/TimelineGenreHeader')

var GalaxyView = React.createClass({

  numRows(numSystems) {
    var n = 2 * Math.ceil(numSystems / 3)
    if (numSystems % 3 !== 0) n--
    return n
  },

  getGalaxyGroupDimensions(systemRadius, numSystems) {
    var width = window.innerWidth
    ,   height = 2 * systemRadius + this.numRows(numSystems) * (width / 4 * Math.tan(Math.PI / 3))
    return {width, height}
  },

  render() {
    // render the "galaxy" view
    var systemRadius = 300
    ,   topPadding = this.props.headerHeight
    ,   dim = this.getGalaxyGroupDimensions(systemRadius, this.props.songs.length)
    ,   horizontalSpacing = dim.width / 4
    ,   verticalSpacing = Math.max(horizontalSpacing * Math.tan(Math.PI / 3), systemRadius * Math.tan(Math.PI / 3))
    ,   hoveredId = this.props.dynamicState.get('hoveredSystemId')
    ,   scales = this.props.scales
    ,   timelineHighlineY = this.props.dynamicState.get('legendOpen') ? this.props.headerHeight + this.props.legendHeight : this.props.headerHeight

    var systemY = topPadding + systemRadius
    ,   songSystems = this.props.songs.map(function(songData, i) {
          var sx
          ,   sy = systemY
          ,   index = (i + 1) % 3
          if (index === 0) {
            sx = 2 * horizontalSpacing
            systemY += verticalSpacing
          } else if (index === 1) {
            sx = horizontalSpacing
          } else if (index === 2) {
            sx = 3 * horizontalSpacing
            systemY += verticalSpacing
          }

          var systemId = songData.id
          ,   shouldAnimate = systemId !== hoveredId

          return (
            <SongSystem
              id={systemId}
              animate={shouldAnimate}
              isHovered={!shouldAnimate}
              x={sx}
              y={sy}
              r={systemRadius}
              songData={songData}
              scales={scales}
              key={songData.title}
            />
          )
        })

    return (
      <svg className="MainView SongGalaxy" {...dim} >
        <defs>
          <g dangerouslySetInnerHTML={{ __html: SvgUtil.getStarGlow() }} />
          <g dangerouslySetInnerHTML={{ __html: SvgUtil.getGalaxyGradient() }} />
          <g dangerouslySetInnerHTML={{ __html: SvgUtil.getGalaxyShadow() }} />
        </defs>
        {this.props.songs.length ?
          <TimelineGenreHeader
            transform={SvgUtil.translateString(0, timelineHighlineY)}
            dynamicState={this.props.dynamicState}
            genreSplit={this.props.genreCount}
            headerWidth={dim.width}
            colorScale={scales.getColorScale()}
          />
        : null}
        {songSystems}
      </svg>
    )
  }

})

module.exports = GalaxyView