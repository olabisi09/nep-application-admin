interface ExplorePayload {
  id?: number;
  title: string;
  description: string;
  isActive: boolean;
}

interface ExploreResponse {
  statusCode: number;
  message: string;
  data: Explore[];
}

interface Explore {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}
