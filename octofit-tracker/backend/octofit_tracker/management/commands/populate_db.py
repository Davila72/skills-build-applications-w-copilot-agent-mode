from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Borrar datos existentes
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Crear equipos
        marvel = Team.objects.create(name='Marvel', description='Equipo Marvel')
        dc = Team.objects.create(name='DC', description='Equipo DC')

        # Crear usuarios (superhéroes)
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
        ]

        # Crear actividades
        Activity.objects.create(user=users[0], type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='Swimming', duration=25, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='Yoga', duration=40, date=timezone.now().date())

        # Crear workouts
        w1 = Workout.objects.create(name='Cardio Blast', description='Entrenamiento de cardio intenso')
        w2 = Workout.objects.create(name='Strength Builder', description='Rutina de fuerza')
        w1.suggested_for.set(users[:2])
        w2.suggested_for.set(users[2:])

        # Crear leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('La base de datos octofit_db ha sido poblada con datos de ejemplo.'))
