import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import iconId1 from "../../assets/Icons/categoryIcons/iconId1.png";
import iconId2 from "../../assets/Icons/categoryIcons/iconId2.png";
import iconId3 from "../../assets/Icons/categoryIcons/iconId3.png";
import iconId4 from "../../assets/Icons/categoryIcons/iconId4.png";
import iconId5 from "../../assets/Icons/categoryIcons/iconId5.png";
import iconId6 from "../../assets/Icons/categoryIcons/iconId6.png";
import iconId7 from "../../assets/Icons/categoryIcons/iconId7.png";
import iconId8 from "../../assets/Icons/categoryIcons/iconId8.png";
import ReplayIcon from "@material-ui/icons/Replay";
import filterIcon from "../../assets/Icons/filter.png";
import sortIcon from "../../assets/Icons/sort.png";
import News from "./News";
import "./NewsWindow.css";

function smallestToBiggest(a, b) {
  return new Date(a.publishDate) - new Date(b.publishDate);
}

function biggestToSmallest(a, b) {
  return new Date(b.publishDate) - new Date(a.publishDate);
}

class NewsWindowRoleRead extends React.Component {
  constructor() {
    super();
    this.state = {
      newsList: [],
      expanded: true,
      open: false,
      expandedNews: true,
      openNews: false,
      openCreate: false,
      openFilter: false,
      sort: false,
      filter: false,
      isSubmitting: true,
      setOpenDialog: false,
      openDialogRedux: false,
      reduxIdNewsEvent: 0,
      reduxIdNews: 0,
      reduxReportNews: "",
      reduxTitleNews: "",
      reduxCategoryId: "",
      reduxPublicDate: "",
      reduxPublishTime: "",
      reduxPublishEnabled: false,
      createCheck: false,
      createDate: "",
      checked: false,
      curDate: new Date(),
      selectedDate: new Date(),
      filterEvent: null,
      filteredDate: null,
      filterShow: false,
      filterDone: false,
    };
  }

  handleFormatNumberToDate = (date) => {
    var d = new Date(date * 1000);
    var date =
      ("0" + d.getDate()).slice(-2) +
      "." +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "." +
      d.getFullYear();
    return date;
  };

  handleFormatFilterDate = (date) => {
    var d = new Date(date * 1000);
    var date =
      ("0" + d.getDate()).slice(-2) +
      "." +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "." +
      d.getFullYear();
    var dateWithTimeFilter = date + " " + "03:00:00";
    var splitedDate = dateWithTimeFilter.split(".");
    var numberFilterDate = new Date([splitedDate[1], splitedDate[0], splitedDate[2]]) * 1;
    return numberFilterDate;
  };

  handleFormatNumberToTime = (date) => {
    return new Date(date * 1000).toLocaleTimeString();
  };

  handleChangeEvent = (event) => {
    this.setState({ reduxIdNewsEvent: event.target.value });
  };


  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  refreshPage = () => {
    window.location.reload();
  };

  whatToShow = () => {
    if (this.state.filterShow == "true") {
      return this.showNewsAccordionListFiltered;
    } else return this.showNewsAccordionList;
  };

  handleClickOpenSort = () => {
    if (this.state.sort === false) {
      this.setState({ sort: true });
    } else this.setState({ sort: false });
  };

  handleClickOpenFilter = () => {
    if (this.state.filter === false) {
      this.setState({ openFilter: true });
    } else this.setState({ openFilter: false });
  };

  handleClickCloseFilter = () => {
    this.setState({ openFilter: false });
  };

  handleExpandClick = () => {
    this.state.setExpanded(!this.state.expanded);
  };

  handleExpandNewsClick = () => {
    this.state.setExpandedNews(!this.state.expandedNews);
  };

  handleChangeNews = (panel) => (event, isExpanded) => {
    this.setState({ expandedNews: isExpanded ? panel : false });
  };

  componentDidMount() {
    // axios
    //   .get(BackDataService.getAllNews())
    //   // axios.get(`http://130.193.44.96:8080/fmh/news`)
    //   .then((res) => {
    //     const newsList = res.data;
    //     this.setState({ newsList });
    //   });
  }

  render() {
    const sorted = this.state.newsList.sort(smallestToBiggest);
    if (this.state.sort === false) {
      this.sorted = this.state.newsList.sort(biggestToSmallest);
    }

    const filteredResults = this.state.newsList.filter((value) => {
      if (this.state.filterEvent != null && !isNaN(this.state.filteredDate)) {
        var date = this.handleFormatFilterDate(value.publishDate);
        var isFaund =
          String(value.newsCategoryId).includes(this.state.filterEvent) &&
          String(date).includes(this.state.filteredDate);
        return isFaund;
      }
      if (this.state.filterEvent != null) {
        return String(value.newsCategoryId).includes(this.state.filterEvent);
      }
      var date = this.handleFormatFilterDate(value.publishDate);
      return String(date).includes(this.state.filteredDate);
    });

    var shown = sorted;
    if (this.state.filterDone) {
      shown = filteredResults;
    }
    const showNewsAccordionList = shown.map((s) => {
      let publishEnabledIcon;

      let icon;
      switch (s.newsCategoryId) {
        case 1:
          icon = <img src={iconId1} alt={"test"} />;
          break;
        case 2:
          icon = <img src={iconId2} alt={"test"} />;
          break;
        case 3:
          icon = <img src={iconId3} alt={"test"} />;
          break;
        case 4:
          icon = <img src={iconId4} alt={"test"} />;
          break;
        case 5:
          icon = <img src={iconId5} alt={"test"} />;
          break;
        case 6:
          icon = <img src={iconId6} alt={"test"} />;
          break;
        case 7:
          icon = <img src={iconId7} alt={"test"} />;
          break;
        case 8:
          icon = <img src={iconId8} alt={"test"} />;
          break;
        default:
          break;
      }
      let publicDate = this.handleFormatNumberToDate(s.publishDate);
      let createDate = this.handleFormatNumberToDate(s.createDate);

      if (s.publishEnabled == "false") {
        publishEnabledIcon = (
          <Typography>
            <Close /> ???? ??????????????????
          </Typography>
        );
      } else {
        publishEnabledIcon = (
          <Typography>
            <Check /> ??????????????????
          </Typography>
        );
      }
      return (
        <Accordion
          expanded={this.expandedNews}
          className="boxAccordion"
          onChange={this.handleChangeNews(s.createDate)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header">
            <Typography
              className="accordionTypography"
              style={{
                fontSize: "theme.typography.pxToRem(15)",
              }}>
              <ListItemIcon>{icon}</ListItemIcon>
              {s.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="detailsAccordion">
            <Box item boxShadow={1} xs={3} className="boxCreate">
              <Typography className="typFloatLeft">???????? ????????????????????: </Typography>
              <Typography className="typFloatRight">{publicDate}</Typography>
            </Box>

            <Box item boxShadow={1} xs={3} className="boxCreate">
              <Typography className="typFloatLeft">???????? ????????????????: </Typography>
              <Typography className="typFloatRight">{createDate}</Typography>
            </Box>
            <Box item boxShadow={1} xs={3} className="boxCreate">
              <Typography className="typFloatLeft">??????????:</Typography>
              <Typography className="typFloatRight">{s.creatorName}</Typography>
            </Box>
            <Box item boxShadow={1} xs={3} className="boxPublic">
              <Typography className="typFloatLeft">{publishEnabledIcon}</Typography>
            </Box>
            <div className="typFloatLeft">
              <Typography>{s.description}</Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      );
    });

    return this.state.newsList ? (
      <div className="divNews">
        <Paper className="paperDivNews" elevation={1}>
          <Typography variant="h5" component="h3" className="mainTitle">
            ??????????????
            <div className="typButtonsRight">
              <Button color="primary" onClick={this.refreshPage}>
                <ReplayIcon color="action" />
              </Button>
              <Button color="primary" onClick={this.handleClickOpenSort}>
                <img src={sortIcon} alt={"test"} />
              </Button>
              <Button color="primary" onClick={this.handleClickOpenFilter}>
                <img src={filterIcon} alt={"test"} />
              </Button>
              {/* showDialogFilter CREATEFORM */}
            </div>
          </Typography>
          <div>{showNewsAccordionList}</div>
        </Paper>
      </div>
    ) : (
      <News />
    );
  }
}

export default NewsWindowRoleRead;
