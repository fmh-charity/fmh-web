import React, { useState, useEffect } from "react";
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime'

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
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
import addIcon from "../../assets/Icons/add.png";
import ReplayIcon from "@material-ui/icons/Replay";
import deleteIcon from "../../assets/Icons/delete.png";
import filterIcon from "../../assets/Icons/filter.png";
import reduxIcon from "../../assets/Icons/redux.png";
import sortIcon from "../../assets/Icons/sort.png";

import { Filter } from './Filter';
import { EditForm } from '../edit/ui/EditForm';

import useRepository from '../repository';

import News from "./News";
import "./NewsWindow.css";

const iconMap = new Map([
  [1, <img src={iconId1} alt={"test"} />],
  [2, <img src={iconId2} alt={"test"} />],
  [3, <img src={iconId3} alt={"test"} />],
  [4, <img src={iconId4} alt={"test"} />],
  [5, <img src={iconId5} alt={"test"} />],
  [6, <img src={iconId6} alt={"test"} />],
  [7, <img src={iconId7} alt={"test"} />],
  [8, <img src={iconId8} alt={"test"} />],
]);

const AccordionItem = ({ record, publishEnabledIcon }) => {
  const [, methods] = useRepository();

  return (
    <Accordion className="boxAccordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2bh-content"
        id="panel2bh-header">
        <Typography
          className="accordionTypography"
          style={{
            fontSize: "theme.typography.pxToRem(15)",
          }}>
            <ListItemIcon>{iconMap.get(record.newsCategoryId)}</ListItemIcon>
          {record.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="detailsAccordion">
        <Box item boxShadow={1} xs={3} className="boxCreate">
          <Typography className="typFloatLeft">Дата публикации: </Typography>
          <Typography className="typFloatRight">{format(fromUnixTime(record.publishDate), 'dd.MM.yyyy')}</Typography>
        </Box>

        <Box item boxShadow={1} xs={3} className="boxCreate">
          <Typography className="typFloatLeft">Дата создания: </Typography>
          <Typography className="typFloatRight">{format(fromUnixTime(record.createDate), 'dd.MM.yyyy')}</Typography>
        </Box>
        <Box item boxShadow={1} xs={3} className="boxCreate">
          <Typography className="typFloatLeft">Автор:</Typography>
          <Typography className="typFloatRight">{record.creatorName}</Typography>
        </Box>
        <Box item boxShadow={1} xs={3} className="boxPublic">
          <Typography className="typFloatLeft">{publishEnabledIcon}</Typography>
          <Typography className="typButtons">
            <Button 
              color="black" 
              className="typButtonsLeft" 
              onClick={() => methods.removeRecord(record.id)}
            >
              <img src={deleteIcon} alt={"test"} />
            </Button>
            <Button
              className="typButtons"
              color="black"
              onClick={() => methods.openEditModal(record)}>
              <img src={reduxIcon} alt={"test"} />
            </Button>
          </Typography>
        </Box>
        <div className="typText">
          <Typography>{record.description}</Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const NewsWindow = () => {
  const [repo, methods] = useRepository();

  useEffect(() => { methods.getNews(); }, []);

  return repo.list ? (
    <div className="divNews">
      <Paper className="paperDivNews" elevation={1}>
        <Typography variant="h5" component="h3" className="mainTitle">
          Новости
          <div className="typButtonsRight">
            <Button color="primary" onClick={methods.getNews}>
              <ReplayIcon color="action" />
            </Button>

            <Button color="primary" onClick={methods.sortNews}>
              <img src={sortIcon} alt={"test"} />
            </Button>
            <Button color="primary" onClick={methods.openFilter}>
              <img src={filterIcon} alt={"test"} />
            </Button>
            <Filter />
            <Button color="primary" onClick={methods.openEditModal}>
              <img src={addIcon} alt={"test"} />
            </Button>
            <EditForm />
          </div>
        </Typography>
        <div>{repo.list.map((record) => {
          let publishEnabledIcon;

          if (record.publishEnabled === "false") {
            publishEnabledIcon = (
              <Typography>
                <Close /> НЕ РАЗМЕЩЕНА
              </Typography>
            );
          } else {
            publishEnabledIcon = (
              <Typography>
                <Check /> РАЗМЕЩЕНА
              </Typography>
            );
          }
          return <AccordionItem 
            key={record.id}
            record={record} 
            publishEnabledIcon={publishEnabledIcon}
          />
        })}
        </div>
      </Paper>
    </div>
  ) : (
    <News />
  );
};

export default NewsWindow;
