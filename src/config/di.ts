//database
import '../infra/database/postgresConnection';

//daos
import '../infra/workout/daos/WorkoutDao';
import '../infra/workout/daos/WorkoutHistoryDao';

//repositories
import '../domain/workout/repositories/WorkoutRepository';

//services
import '../domain/workout/services/WorkoutService';

//controllers
import '../application/controllers/infra/ReadinessController';
import '../application/controllers/workout/CreateWorkoutController';
import '../application/controllers/workout/UpdateWorkoutController';
import '../application/controllers/workout/ListWorkoutController';
