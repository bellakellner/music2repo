from django.contrib import admin
from .models import User, Artist, Rating, Song

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('username','password')

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('artist','song')

class RatingAdmin(admin.ModelAdmin):
    list_display = ('id','username','song','rating')

class SongAdmin(admin.ModelAdmin):
    list_display = ('id','artist','song')

admin.site.register(User, UserAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Song, SongAdmin)
