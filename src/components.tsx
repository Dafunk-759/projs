// mui
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"

import IconButton from "@mui/material/IconButton"
import type { IconButtonProps } from "@mui/material/IconButton"

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"

import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"

import Stack from "@mui/material/Stack"
import type { StackProps } from "@mui/material/Stack"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CardHeader from "@mui/material/CardHeader"

import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Fab from "@mui/material/Fab"
import Alert from "@mui/material/Alert"
import Tooltip from "@mui/material/Tooltip"

import Input from "@mui/material/Input"

import Select from "@mui/material/Select"
import type { SelectProps } from "@mui/material/Select"

import InputLabel from "@mui/material/InputLabel"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"

import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AddIcon from "@mui/icons-material/Add"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import HomeIcon from "@mui/icons-material/Home"
import FindInPageIcon from "@mui/icons-material/FindInPage"
import GitHubIcon from "@mui/icons-material/GitHub"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import LocalDrinkIcon from "@mui/icons-material/LocalDrink"
import CookieIcon from "@mui/icons-material/Cookie"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"

import Skeleton from "@mui/material/Skeleton"
import CircularProgress from "@mui/material/CircularProgress"

import type {
  Style,
  OnClick,
  PropsWithChildren
} from "./types"

import type { NavigateOptions, To } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  ButtonGroup,
  Autocomplete,
  TextField,
  MenuItem,
  Paper,
  Container,
  CssBaseline,
  Stack,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  Divider,
  Fab,
  Alert,
  Tooltip,
  Input,
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
  Brightness4Icon,
  Brightness7Icon,
  ContentCopyIcon,
  KeyboardArrowDownIcon,
  AddIcon,
  ColorLensIcon,
  KeyboardArrowUpIcon,
  HomeIcon,
  FindInPageIcon,
  GitHubIcon,
  FastfoodIcon,
  LocalDrinkIcon,
  CookieIcon,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Skeleton,
  CircularProgress
}

// react-router
export { Routes, Route } from "react-router-dom"

// custom
export function CopyButton(props: IconButtonProps) {
  return (
    <Tooltip title="copy">
      <IconButton {...props} aria-label="copy">
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  )
}

type SelectOption = {
  value: string
  name: string
}
export function SelectInput({
  name,
  label,
  options,
  sx,
  ...props
}: {
  sx?: Style
  name: string
  label: string
  options: SelectOption[]
} & SelectProps) {
  return (
    <FormControl sx={sx}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        {...props}
        labelId={`${name}-label`}
        id={`${name}-select`}
        label={name}
      >
        {options.map(o => (
          <MenuItem value={o.value} key={o.value}>
            {o.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export function IconLink({
  to,
  navigateOptions,
  onClick,
  tooltip,
  children,
  ...props
}: {
  to: To
  navigateOptions?: NavigateOptions
  onClick?: OnClick
  tooltip?: string
} & PropsWithChildren &
  IconButtonProps) {
  const navigate = useNavigate()

  const iconButton = (
    <IconButton
      {...props}
      onClick={e => {
        navigate(to, navigateOptions)
        onClick?.(e)
      }}
      color="inherit"
    >
      {children}
    </IconButton>
  )

  return tooltip ? (
    <Tooltip title={tooltip}>{iconButton}</Tooltip>
  ) : (
    iconButton
  )
}

export function CenterStack({
  children,
  ...props
}: PropsWithChildren & StackProps) {
  return (
    <Container sx={{ marginBottom: 2 }}>
      <Paper>
        <Stack {...props}>{children}</Stack>
      </Paper>
    </Container>
  )
}
