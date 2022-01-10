import { generateRepository } from "../repository-service";
import controller from "./controller";

export default generateRepository({ claims: null, error: "" }, controller);
