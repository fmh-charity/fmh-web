import { generateRepository } from "../../repository-service";
import controller from "./controller";

export default generateRepository({ comments: null, error: "" }, controller);
