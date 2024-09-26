import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { engine } from 'express-handlebars';

import authRoutes from './auth/routes/auth-route';
import assistanceRoutes from './assistance/routes/assistance-route';

export const app: Application = express();

app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      eq: (a, b) => a === b,
    },
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/auth/login', (req, res) => {
  res.render('auth/login', { title: 'Login | Devioz GYM', layout: 'auth' });
});

app.get('/auth/register', (req, res) => {
  res.render('auth/register', {
    title: 'Registro | Devioz GYM',
    layout: 'auth',
  });
});

app.get('/admin/dashboard', (req, res) => {
  res.render('admin/dashboard', {
    title: 'Dashboard | Devioz GYM',
    layout: 'main',
  });
});

app.get('/', (req, res) => {
  res.render('app/home', {
    title: 'Home | Devioz GYM',
    layout: 'app',
    currentPath: req.path,
  });
});

app.get('/products', (req, res) => {
  res.render('app/products', {
    title: 'Productos | Devioz GYM',
    layout: 'app',
    currentPath: req.path,
  });
});

app.get('/products/:id', (req, res) => {
  res.render('app/product-detail', {
    title: 'Productos | Devioz GYM',
    layout: 'app',
    currentPath: req.path,
  });
});

app.get('/payments', (req, res) => {
  res.render('app/payment', {
    title: 'Pagos | Devioz GYM',
    layout: 'app',
    currentPath: req.path,
  });
});

app.get('/profile', (req, res) => {
  res.render('app/profile', {
    title: 'Perfil | Devioz GYM',
    layout: 'app',
    currentPath: req.path,
  });
});

app.get('/reports', (req, res) => {
  res.render('app/reports', {
    title: 'Reportes | Devioz GYM',
    layout: 'app',
    currentPath: req.path,
  });
});

// Routes for the API
app.use('/api/auth', authRoutes);
app.use('/api/assistance', assistanceRoutes);

// Error handling
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
